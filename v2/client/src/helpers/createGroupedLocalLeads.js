export const captalizesName = name =>
  name && name[0].toUpperCase() + name.substr(1);

export const createGroupedLocalLeads = arr => {
  const groupedLocalLeads = {};
  arr.forEach(item => {
    groupedLocalLeads[item.region] = groupedLocalLeads[item.region]
      ? groupedLocalLeads[item.region.toLowerCase()]
      : [];

    groupedLocalLeads[item.region].push({
      name: captalizesName(item.name),
      _id: item._id,
      officialLocalLead: item.officialLocalLead,
    });
  });
  return groupedLocalLeads;
};
