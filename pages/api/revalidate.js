export default async function revalidate(req, res) {
  try {
    for (const url of req.body) {
      await res.revalidate(`/${url}`);
    }
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
