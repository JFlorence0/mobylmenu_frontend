import React from 'react';
import FormHeader from '../../../components/businessComponents/FormHeader';
import FormHeaderSpacer from '../../../components/businessComponents/FormHeaderSpacer';
import { Helmet } from 'react-helmet-async';

const ManageTagsAndPhotosScreen = () => {
  return (
    <div className="divided-container">
      <Helmet>
        <title>{`Tags & Photos | MobylMenu`}</title>
      </Helmet>
      <FormHeader buttonTitle={"Submit"} title={"Venue Photos & Tags"} />
      <FormHeaderSpacer />
      <div className="left-divided-container">

      </div>
      <div className="right-divided-container">
          
      </div>
    </div>
  );
};

export default ManageTagsAndPhotosScreen;