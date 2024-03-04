let sInput =`
1e1e1e - Dark gray - Primary text/heading color
f5f5f5 - Light gray - Secondary text color
e8e8e8 - Medium gray - Muted accent
ffffff - White - Primary background color
`

// const url = `https://coolors.co/visualizer/1e1e1e-8f8282-915a5a-ffffff`
/** parse sInput into an array of objects */
let aInput = sInput.trim().split('\n').map((sLine)=>{
  let [hex,name,desc] = sLine.split(' - ');
  return {hex,name,desc}
})


const url = `https://coolors.co/visualizer/${aInput.map((o)=>o.hex).join('-')}`
console.log(url);
/* log into json

 */
// console.log(JSON.stringify(aInput,null,2));
const outColors = {
  primary: aInput[0].hex,
  secondary: aInput[1].hex,
  tertiary: aInput[2].hex,
  neutral: aInput[3].hex
  
}
// append #
for (let key in outColors) {
  outColors[key] = '#' + outColors[key];
}
console.log(JSON.stringify(outColors,null,2));
