
export const BikeLabelMap = {
    airstrike: 'Airstrike',
    laser: 'Laser',
    shadow: 'Shadow',
    limited:'Limited'
};

export const VariantLabelMap = {
    "ORG" : "Original",
    "REC": "Recon"
}
export function GetShortcodeSequence(selection) {

    switch(selection.length) {
      case 1:
        return selection[0];
      case 2:
        if(selection.includes("LEV") && selection.includes("WHE"))
        return "LEVWHE";
        if(selection.includes("PAN") && selection.includes("WHE"))
        return "PANWHE";
        else return "LEVPAN";
      case 3:
        return "LEVPANWHE";
      default:
        return "";
    }  
}
