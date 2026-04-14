/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // カラーパレット（和風テイスト）
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      colors: {
        // メインカラー：温かみのある金・茶系
        gold: {
          50:  '#fefbf3',
          100: '#fdf5e0',
          200: '#fae6b8',
          300: '#f5cc78',
          400: '#e8a835',
          DEFAULT: '#8B6914', // プライマリ
          600: '#705213',
          700: '#5a3f0f',
          800: '#3d2b0b',
          900: '#231908',
        },
        // サブカラー：深い茶色
        brown: {
          50:  '#faf6f3',
          100: '#f2e8e1',
          200: '#e0c9bb',
          DEFAULT: '#5C4033',
          600: '#4a3329',
          700: '#3d2b22',
          800: '#2c1f18',
          900: '#1a120e',
        },
        // 背景カラー：暖かみのあるオフホワイト
        washi: '#FAFAF7',
        cream: '#F5F0E8',
        // アクセント：抹茶グリーン
        matcha: {
          DEFAULT: '#5C7A4E',
          light: '#7a9a6a',
          dark: '#3d5233',
        },
      },
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // フォント
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      fontFamily: {
        'serif': ['var(--font-noto-serif)', 'Georgia', 'serif'],
        'sans':  ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
      },
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // スペーシング追加
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      // アニメーション
      // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
