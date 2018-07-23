import React from 'react';

const CaseInfo = ({ index, changeHandler, caseInfoData }) => {
  return (
    <div key={index} className="form-group">
        <label htmlFor="case-info-key">Case-info rubrik</label>
        <input className="form-control" type="text" name="case-info-key" id={index + 1} onChange={e => changeHandler(e)} value={ (caseInfoData && caseInfoData.key) } required/>
        <label htmlFor="case-info-value">Case-info entry</label>
        <input className="form-control" type="text" name="case-info-value" id={index + 1} onChange={e => changeHandler(e)} value={ (caseInfoData && caseInfoData.value) } required/>
    </div>
  )
}

export default CaseInfo;