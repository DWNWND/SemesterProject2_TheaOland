/**
 * This function is inspired by: https://www.w3schools.com/howto/howto_js_countdown.asp
 * The function makes a countdown and places it in the DOM, if the countdown is over it displays "expired"
 *
 * @param {Date} deadline The listings deadline
 * @param {string} container The container the countdown is added to
 */
export function countdownTimer(deadline, container) {
  const countDownTime = deadline.getTime();

  if (!countDownTime) {
    throw new Error("Can't load the deadline");
  }
  const x = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownTime - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance > 0) {
      const result = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      container.innerText = result;
    }
    if (distance < 0) {
      clearInterval(x);
      const result = "expired";
      container.classList.add("text-red");
      container.innerText = result;
    }
  }, 1000);
}
