/**
 * The function generates a media object with all the images added to a listing. Which can be passed in to the new or updated listing object.
 *
 * @param {Object[]} array The media object array
 * @param {(string|Object[])} fieldset The HTML container of each image
 *
 * @uses profileTemplate To generate a HTML element for the profile view.
 */
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
