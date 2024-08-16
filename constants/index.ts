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

export const goals = [
    {
        title: 'Education',
        description: 'We want to increase knowledge and decrease ignorance among Muslims.',
        image: '/goals/education.png'
    },
    {
        title: 'Wealth',
        description: 'We want to increase wealth and decrease poverty among Muslims.',
        image: '/goals/wealth.png'
    },
    {
        title: 'Islam',
        description: 'We want to teach, spread and defend the religion of Allah, the Most High.',
        image: '/goals/islam.png'
    },
    {
        title: 'Zeal',
        description: 'We want a productive, strong and ambitious Muslim generation.',
        image: '/goals/zeal.png'
    },
    {
        title: 'World',
        description: 'We want to create a better world for us, our beloved ones and those to come after us.',
        image: '/goals/world.png'
    },
]

// --- FEATURES ---
export const focusFeatures = [
    {
        title: 'Timer & Stopwatch',
        description: 'Set precise focus sessions with our timers, driving your productivity and keeping you motivated every step of the way.',
        image: '/tools/time.jpg'
    },
    // {
    //     title: 'Stopwatch ⏱️',
    //     description: 'Track your focus time with our stopwatch, pushing your limits and fueling your motivation as you see your progress in real-time.',
    //     image: PlaceholderPic
    // },
    {
        title: 'White Noise',
        description: 'Enhance your focus or relaxation with calming white noise, featuring natural sounds that create the perfect auditory backdrop.',
        image: '/tools/white-noise.jpg'
    },
    {
        title: 'Backgrounds',
        description: 'Transform your workspace with immersive backgrounds that eliminate distractions and help you dive into the ultimate focus zone.',
        image: '/tools/backgrounds.jpg'
    },
    {
        title: 'Affirmations',
        description: 'Boost your mindset with powerful affirmations that reinforce key truths, reshape your thinking, and keep you motivated to stay on track.',
        image: '/tools/affirmations.jpg'
    },
    // {
    //     title: 'Analytics 📊',
    //     description: 'Unlock deeper insights into your productivity with our analytics, empowering you to refine your focus and achieve even more.',
    //     image: PlaceholderPic
    // },
    {
        title: 'Tasks',
        description: '...',
        image: '/tools/tasks.jpg'
    },
]