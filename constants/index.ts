import PlaceholderPic from '@/public/placeholder.png'
import TimersPic from '@/public/stopwatch.jpg'
import PortalPic from '@/public/portal.jpg'

export const SexOptions = ["Male", "Female"];

export const sidebarLinks = [
    {
        label: 'Home',
        route: '/dashboard',
    },
    {
        label: 'Focus',
        route: '/dashboard/focus',
    },
    {
        label: 'Friends',
        route: '/dashboard/friends',
    },
    {
        label: 'Settings',
        route: '/dashboard/settings',
    },
]

export const focusFeatures = [
    {
        title: 'Timers ⏳',
        description: 'Set precise focus sessions with our timers, driving your productivity and keeping you motivated every step of the way.',
        image: TimersPic
    },
    // {
    //     title: 'Stopwatch ⏱️',
    //     description: 'Track your focus time with our stopwatch, pushing your limits and fueling your motivation as you see your progress in real-time.',
    //     image: PlaceholderPic
    // },
    {
        title: 'Backgrounds 🌅',
        description: 'Transform your workspace with immersive backgrounds that eliminate distractions and help you dive into the ultimate focus zone.',
        image: PortalPic
    },
    {
        title: 'Affirmations 💬',
        description: 'Boost your mindset with powerful affirmations that reinforce key truths, reshape your thinking, and keep you motivated to stay on track.',
        image: TimersPic
    },
    {
        title: 'White Noise 🌊',
        description: 'Enhance your focus or relaxation with calming white noise, featuring natural sounds that create the perfect auditory backdrop.',
        image: PortalPic
    },
    // {
    //     title: 'Analytics 📊',
    //     description: 'Unlock deeper insights into your productivity with our analytics, empowering you to refine your focus and achieve even more.',
    //     image: PlaceholderPic
    // },
    {
        title: 'Other Features 🚀 ',
        description: '',
        image: TimersPic
    },
]