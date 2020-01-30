import React from 'react';

export interface DangerousProps {
  htmlContent: string;
}

const DangerousInnerContent = ({ htmlContent }: DangerousProps) => {
  /* used to set dangerousInnerHtml */
  const htmlFromProp = (val: string) => {
    return { __html: val };
  };

  return <div dangerouslySetInnerHTML={htmlFromProp(htmlContent)} />;
};

export default DangerousInnerContent;
