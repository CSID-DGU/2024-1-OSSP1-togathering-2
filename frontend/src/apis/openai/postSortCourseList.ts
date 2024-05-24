import axios from 'axios'
import { OPEN_AI_API_KEY } from '../common'

type Props = {
  promptEngineering?: string
  text: string
}

export const postSortCourseList = async ({ promptEngineering, text }: Props) => {
  const apiKey = OPEN_AI_API_KEY

  try {
    const result = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // GPT-3.5-turbo 모델 지정
        messages: [{ role: 'user', content: `${promptEngineering}\n${text}` }],
        max_tokens: 4096,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )

    return result.data.choices[0].message.content
  } catch (error) {
    console.error('Error calling OpenAI API:', error)
  }
}
