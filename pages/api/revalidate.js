export default async function revalidate(req, res) {
  const url = req.body;
  try {
    await res.revalidate(`/${url}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
