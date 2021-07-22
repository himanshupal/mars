import { Services } from '@/models/Services'

export const state = (): Services => ({
  generalServices: [
    {
      title: 'Website Development',
      text:
        'Need a cool website for your business ? Let us join you on your journey to success',
      image: 'shield',
      link: '/services/website'
    },
    {
      title: 'Web App Development',
      text:
        'When your business requires a customised application accessible globally over internet',
      image: 'web',
      link: '/services/webapp'
    },
    {
      title: 'Desktop App Development',
      text:
        'Secure desktop app development using cutting edge technogies for faster & safer access',
      image: 'server',
      link: '/services/desktop'
    }
  ],
  tailoredServices: [
    {
      title: 'Education & Health',
      image: 'shield'
    },
    {
      title: 'Retail & Commerce',
      image: 'web'
    },
    {
      title: 'Training Services',
      image: 'server'
    },
    {
      title: 'Travel & Hospitality',
      image: 'server'
    }
  ]
})
