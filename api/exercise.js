export default function handler(req, res) {
  res.status(200).json([
    {
      id: 1,
      name: "Heel Raise",
      sets: "3 x 15",
      district: "Polpaccio"
    },
    {
      id: 2,
      name: "Single Leg Balance",
      sets: "3 x 30 sec",
      district: "Caviglia"
    }
  ]);
}