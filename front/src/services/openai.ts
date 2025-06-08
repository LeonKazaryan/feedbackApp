import OpenAI from 'openai';

let openai: OpenAI | null = null;

export const initOpenAI = (apiKey: string) => {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const generateFeedback = async () => {
  if (!openai) {
    throw new Error('OpenAI not initialized. Please provide API key first.');
  }

  const topics = [
    'product improvement',
    'user experience',
    'feature request',
    'bug report',
    'general feedback'
  ];

  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `Generate a short, realistic user feedback about a web application related to ${randomTopic}. Keep it under 2 sentences and make it sound natural.`
    }],
    max_tokens: 100,
    temperature: 0.7
  });

  const text = response.choices[0]?.message?.content?.trim() || 'Generated feedback not available';
  
  // Generate random likes/dislikes that make sense
  const likes = Math.floor(Math.random() * 50);
  const dislikes = Math.floor(Math.random() * (likes + 5)); // Usually less than likes

  return {
    text,
    likes,
    dislikes
  };
}; 