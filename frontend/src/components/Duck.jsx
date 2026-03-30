import { motion } from 'framer-motion';

const MOODS = {
  happy: { emoji: '🐥', color: 'text-yellow-400', label: 'Your duck is happy!' },
  neutral: { emoji: '🐤', color: 'text-yellow-500', label: 'Your duck is okay...' },
  sad: { emoji: '😢', color: 'text-blue-400', label: 'Your duck is sad!' },
};

export default function Duck({ mood = 'happy' }) {
  const { emoji, color, label } = MOODS[mood] || MOODS.happy;

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className={`text-8xl select-none ${color}`}
        animate={mood === 'happy' ? { y: [0, -10, 0] } : mood === 'sad' ? { rotate: [-5, 5, -5] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        {emoji}
      </motion.div>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
