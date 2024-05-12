export function generateMediaObj(array, fieldset) {
  fieldset.forEach((element) => {
    const url = element.querySelector(".url").value;
    const alt = element.querySelector(".alt").value;

    if (url && alt) {
      const mediaObj = {
        url: url,
        alt: alt,
      };
      array.push(mediaObj);
    }
  });
}
