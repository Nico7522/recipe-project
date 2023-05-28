export default function generateSearchParams(urlName, param) {
  const paramsURL = new URLSearchParams();
  if (Array.isArray(param)) {
    param.forEach((p) => paramsURL.append(urlName, p));
  }

  if (!Array.isArray(param)) {
    paramsURL.append(urlName, param);
  }

  return paramsURL.toString();
}
