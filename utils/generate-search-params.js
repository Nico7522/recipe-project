export default function generateSearchParams(tags) {
    const paramsURL = new URLSearchParams();
    tags.forEach(tag => paramsURL.append('tag', tag));
    return paramsURL.toString();
  }
  