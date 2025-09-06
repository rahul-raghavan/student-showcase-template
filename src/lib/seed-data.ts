import { supabaseAdmin } from './supabase'

export const sampleStories = [
  {
    title: "My Journey Through High School",
    content: `
      <p>High school has been one of the most transformative experiences of my life. When I first walked through those doors as a freshman, I was nervous, unsure of myself, and afraid of what the next four years would bring.</p>
      
      <p>But looking back now, I realize that every challenge I faced, every friendship I made, and every lesson I learned has shaped me into the person I am today. The late-night study sessions, the school plays, the sports games, and even the difficult conversations with teachers - they all mattered.</p>
      
      <p><strong>The most important thing I learned</strong> is that it's okay to not have everything figured out. It's okay to make mistakes, to ask for help, and to change your mind about what you want to do with your life.</p>
      
      <p>To anyone starting high school or going through it right now, remember: you're not alone. Everyone is figuring it out as they go, and that's perfectly normal. Trust yourself, be kind to others, and don't be afraid to step outside your comfort zone.</p>
    `,
    is_visible: true
  },
  {
    title: "The Power of Kindness",
    content: `
      <p>I used to think that being kind meant being weak. I thought that to succeed in life, you had to be tough, competitive, and sometimes even a little mean. But one day, everything changed.</p>
      
      <p>I was having a really bad day. I had failed a test I studied hard for, my friends were busy, and I felt completely alone. That's when Sarah, a girl I barely knew, sat down next to me at lunch and asked if I was okay.</p>
      
      <p>She didn't have to do that. She could have ignored me like everyone else. But her simple act of kindness made me realize that <em>kindness isn't weakness - it's strength</em>.</p>
      
      <p>Since then, I've tried to be more like Sarah. I've learned that a smile, a kind word, or just being there for someone can make all the difference in their day. And the amazing thing is, being kind to others makes me feel better too.</p>
      
      <p>Kindness is contagious. When you're kind to someone, they're more likely to be kind to others. It creates a ripple effect that can change the world, one small act at a time.</p>
    `,
    is_visible: true
  },
  {
    title: "Learning to Fail",
    content: `
      <p>Failure used to terrify me. The thought of not being perfect, of disappointing my parents or teachers, kept me up at night. I would avoid trying new things because I was afraid I might not be good at them.</p>
      
      <p>But then I joined the school debate team. I was terrible at first - I stumbled over my words, my arguments were weak, and I lost every single debate for the first month. I wanted to quit.</p>
      
      <p>My coach, Mrs. Johnson, sat me down and said something that changed everything: <strong>"Every expert was once a beginner. Every pro was once an amateur. Every icon was once an unknown."</strong></p>
      
      <p>She was right. I kept practicing, kept learning from my mistakes, and slowly but surely, I got better. By the end of the year, I was captain of the debate team and we won the state championship.</p>
      
      <p>Now I understand that failure isn't the opposite of success - it's a stepping stone to success. Every time I fail, I learn something new. Every mistake teaches me how to do better next time.</p>
      
      <p>Don't be afraid to fail. Be afraid of not trying at all.</p>
    `,
    is_visible: true
  }
]

export async function seedDatabase() {
  try {
    if (!supabaseAdmin) {
      console.log('Supabase not configured, skipping database seeding')
      return
    }
    
    console.log('Seeding database with sample stories...')
    
    for (const story of sampleStories) {
      const { data, error } = await supabaseAdmin
        .from('stories')
        .insert([story])
        .select()
      
      if (error) {
        console.error('Error inserting story:', error)
      } else {
        console.log('Inserted story:', data?.[0]?.title)
      }
    }
    
    console.log('Database seeding completed!')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}
