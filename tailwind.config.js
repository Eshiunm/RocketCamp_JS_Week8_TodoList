/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      /* 自訂顏色 */
      colors: {
        primary: "#FFD370", // 黃色
        error: "#D87355", // 紅色
        black: "#333333", // 黑色
        gray: "#9F9A91", // 灰色
        "light-gray": "#E5E5E5", //淺灰色
      },
      /* 自訂字體 */
      fontFamily: {
        "baloo-thambi": `"Baloo Thambi 2"`,
      },
      /* 自訂間距 */
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        13: "52px",
        14: "56px",
        15: "60px",
        16: "64px",
        17: "68px",
        18: "72px",
        19: "76px",
        20: "80px",
        21: "84px",
        22: "88px",
        23: "92px",
        24: "96px",
        25: "100px",
      },
    },
    /* 自訂斷點 */
    screens: {
      sm: "576px", // => @media (min-width: 576px) { ... }
      md: "768px", // => @media (min-width: 768px) { ... }
      lg: "1024px", // => @media (min-width: 1024px) { ... }
    },
    /* 自訂文字大小 */
    fontSize: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
    },
  },
  plugins: [],
};
