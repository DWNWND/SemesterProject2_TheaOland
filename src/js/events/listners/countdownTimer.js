//FROM: https://www.w3schools.com/howto/howto_js_countdown.asp

export function coundownTimer(deadline, container) {
  // Set the date we're counting down to
  // var countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();
  const countDownTime = deadline.getTime();

  if (!countDownTime) {
    throw new Error("Can't load the deadline");
  }
  // Update the count down every 1 second
  const x = setInterval(function () {
    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownTime - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the container element
    if (distance > 0) {
      const result = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      container.innerText = result;
    }
    // If the count down is finished, write "expired"
    if (distance < 0) {
      clearInterval(x);
      const result = "expired";
      container.classList.add("text-red");
      container.innerText = result;
    }
  }, 1000);
}
