return res.status(200).json({
  keys: Object.keys(notion),
  databases: typeof notion.databases,
  dataSources: typeof notion.dataSources,
});