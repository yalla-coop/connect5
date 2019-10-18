export const captalizesName = name =>
  name && name[0].toUpperCase() + name.substr(1);

export const createGroupedLocalLeads = arr => {
  const groupedLocalLeads = {};
  arr.forEach(item => {
    const capitalizedRegion = item.region.toUpperCase();
    groupedLocalLeads[capitalizedRegion] = groupedLocalLeads[capitalizedRegion]
      ? groupedLocalLeads[capitalizedRegion]
      : [];

    groupedLocalLeads[item.region.toUpperCase()].push({
      name: captalizesName(item.name),
      _id: item._id,
      officialLocalLead: item.officialLocalLead,
    });
  });

  return groupedLocalLeads;
};
