const LABELS = {
  SOURCE: { text: 'Source', color: '#80dd6c', canApprove: true },
  METHOD: { text: 'Méthode', color: '#6cddd7', canApprove: true },
  BIAIS: { text: 'Biais', color: '#e87266', canApprove: true },
  QUESTION: { text: 'Question', color: '#ea9ae7', canApprove: false },
  OPINION: { text: 'Opinion', color: '#ff993f', canApprove: false },
  FUN: { text: 'Fun', color: '#CCCCCC', canApprove: false },
};

export default Object.keys(LABELS);

export const labelText = key => LABELS[key].text;
export const labelColor = key => LABELS[key].color;
export const labelCanApprove = key => LABELS[key].canApprove;

export const labelBackgroundStyle = (key) => ({
  backgroundColor: labelColor(key) + '99',
});

export const labelBorderStyle = (key) => ({
  borderColor: labelColor(key) + ' !important',
});
