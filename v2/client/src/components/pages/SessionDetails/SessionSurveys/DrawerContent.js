import React from 'react';

import ScheduleTable from './ScheduleTable';

const DrawerContent = ({ loading, drawerKey, handleSelectDate }) => {
  switch (drawerKey) {
    case 'scheduleTable':
      return (
        <ScheduleTable loading={loading} handleSelectDate={handleSelectDate} />
      );

    default:
      return null;
  }
};

export default DrawerContent;
