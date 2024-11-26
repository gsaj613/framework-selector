import React, { useState } from 'react';

const FrameworkSelector = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

  const questions = [
    {
      id: 'size',
      text: 'What is the size of your organization?',
      options: [
        'Small (< 50 employees)',
        'Medium (50-500 employees)',
        'Large (> 500 employees)'
      ]
    },
    {
      id: 'maturity',
      text: 'What is your organization\'s level of business process maturity?',
      options: [
        'Starting/Basic - Few documented processes',
        'Developing - Some processes documented',
        'Mature - Well-documented processes',
        'Advanced - Continuously improving processes'
      ]
    },
    {
      id: 'priority',
      text: 'What is your primary strategic priority?',
      options: [
        'Operational Excellence',
        'Customer Intimacy',
        'Product Leadership',
        'Market Expansion',
        'Risk Management'
      ]
    },
    {
      id: 'resources',
      text: 'What level of resources can you dedicate to framework implementation?',
      options: [
        'Minimal - Limited time and staff',
        'Moderate - Dedicated team available',
        'Significant - Full organizational support'
      ]
    },
    {
      id: 'challenge',
      text: 'What is your biggest current challenge?',
      options: [
        'Strategic Alignment',
        'Operational Efficiency',
        'Innovation',
        'Quality Management',
        'Risk Management'
      ]
    }
  ];

  const frameworks = {
    'McKinsey 7S': {
      description: 'Best for organizational alignment and change management',
      score: 0,
      weights: {
        size: { 'Large (> 500 employees)': 2 },
        maturity: { 'Mature - Well-documented processes': 2 },
        priority: { 'Strategic Alignment': 3 },
        challenge: { 'Strategic Alignment': 3 }
      }
    },
    'Balanced Scorecard': {
      description: 'Ideal for performance measurement and strategic execution',
      score: 0,
      weights: {
        size: { 'Medium (50-500 employees)': 2, 'Large (> 500 employees)': 3 },
        maturity: { 'Developing - Some processes documented': 2, 'Mature - Well-documented processes': 3 },
        priority: { 'Operational Excellence': 3 }
      }
    },
    'Business Model Canvas': {
      description: 'Perfect for startups and business model innovation',
      score: 0,
      weights: {
        size: { 'Small (< 50 employees)': 3 },
        maturity: { 'Starting/Basic - Few documented processes': 3 },
        priority: { 'Product Leadership': 3, 'Market Expansion': 2 }
      }
    },
    'EFQM Excellence Model': {
      description: 'Comprehensive quality management system',
      score: 0,
      weights: {
        size: { 'Large (> 500 employees)': 3 },
        maturity: { 'Mature - Well-documented processes': 3, 'Advanced - Continuously improving processes': 3 },
        priority: { 'Operational Excellence': 3 },
        resources: { 'Significant - Full organizational support': 3 }
      }
    },
    'Value Chain Analysis': {
      description: 'Best for operational optimization and competitive advantage',
      score: 0,
      weights: {
        priority: { 'Operational Excellence': 3 },
        challenge: { 'Operational Efficiency': 3 }
      }
    }
  };

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[step].id]: answer });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let scoredFrameworks = { ...frameworks };

    Object.keys(scoredFrameworks).forEach(framework => {
      let totalScore = 0;
      Object.entries(answers).forEach(([questionId, answer]) => {
        if (scoredFrameworks[framework].weights[questionId]?.[answer]) {
          totalScore += scoredFrameworks[framework].weights[questionId][answer];
        }
      });
      scoredFrameworks[framework].score = totalScore;
    });

    const sortedResults = Object.entries(scoredFrameworks)
      .sort(([,a], [,b]) => b.score - a.score)
      .slice(0, 3)
      .filter(([,framework]) => framework.score > 0);

    setResults(sortedResults);
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResults([]);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Framework Selection Tool</h1>
      </div>
      
      {results.length === 0 ? (
        <div className="space-y-6">
          <div className="text-lg font-medium">
            {questions[step].text}
          </div>
          <div className="space-y-2">
            {questions[step].options.map((option) => (
              <button
