
export const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["api-key"]; // Header: api-key

  if (!apiKey) {
    return res.status(401).json({ error: "API-Key missing" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid API-Key" });
  }

  next();
};
