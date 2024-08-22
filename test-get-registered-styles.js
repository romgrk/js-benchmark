/*
 * test-label-parsing.js
 */

const inputs = [
  'MuiButtonBase-root  css-1skqidh  MuiButton-root MuiButton-outlined MuiButton-outlinedSuccess   MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorSuccess   MuiButton-root MuiButton-outlined MuiButton-outlinedSuccess MuiButton-sizeMedium MuiButton-outlinedSizeMedium MuiButton-colorSuccess  css-14x6zue',
  'css-15hif23 css-1vec1w css-14x6zue css-14ojtvh css-kxptbm css-1skqidh'
]

const registered = {
    "css-1skqidh": "font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:500;font-size:0.875rem;line-height:1.75;letter-spacing:0.02857em;text-transform:uppercase;min-width:64px;padding:6px 16px;border:0;border-radius:4px;transition:background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;&:hover{text-decoration:none;}&.Mui-disabled{color:rgba(0, 0, 0, 0.26);};padding:5px 15px;border:1px solid currentColor;border-color:var(--variant-outlinedBorder, currentColor);background-color:var(--variant-outlinedBg);color:var(--variant-outlinedColor);&.Mui-disabled{border:1px solid rgba(0, 0, 0, 0.12);};--variant-textColor:#1976d2;--variant-outlinedColor:#1976d2;--variant-outlinedBorder:#1976d280;--variant-containedColor:#fff;--variant-containedBg:#1976d2;@media (hover: hover){&:hover{--variant-containedBg:#1565c0;--variant-textBg:#1976d20a;--variant-outlinedBorder:#1976d2;--variant-outlinedBg:#1976d20a;}};padding:3px 9px;font-size:0.8125rem;;",
    "css-kxptbm": "font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:500;font-size:0.875rem;line-height:1.75;letter-spacing:0.02857em;text-transform:uppercase;min-width:64px;padding:6px 16px;border:0;border-radius:4px;transition:background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;&:hover{text-decoration:none;}&.Mui-disabled{color:rgba(0, 0, 0, 0.26);};padding:5px 15px;border:1px solid currentColor;border-color:var(--variant-outlinedBorder, currentColor);background-color:var(--variant-outlinedBg);color:var(--variant-outlinedColor);&.Mui-disabled{border:1px solid rgba(0, 0, 0, 0.12);};--variant-textColor:#1976d2;--variant-outlinedColor:#1976d2;--variant-outlinedBorder:#1976d280;--variant-containedColor:#fff;--variant-containedBg:#1976d2;@media (hover: hover){&:hover{--variant-containedBg:#1565c0;--variant-textBg:#1976d20a;--variant-outlinedBorder:#1976d2;--variant-outlinedBg:#1976d20a;}};",
    "css-14ojtvh": "font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:500;font-size:0.875rem;line-height:1.75;letter-spacing:0.02857em;text-transform:uppercase;min-width:64px;padding:6px 16px;border:0;border-radius:4px;transition:background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;&:hover{text-decoration:none;}&.Mui-disabled{color:rgba(0, 0, 0, 0.26);};padding:5px 15px;border:1px solid currentColor;border-color:var(--variant-outlinedBorder, currentColor);background-color:var(--variant-outlinedBg);color:var(--variant-outlinedColor);&.Mui-disabled{border:1px solid rgba(0, 0, 0, 0.12);};--variant-textColor:#1976d2;--variant-outlinedColor:#1976d2;--variant-outlinedBorder:#1976d280;--variant-containedColor:#fff;--variant-containedBg:#1976d2;@media (hover: hover){&:hover{--variant-containedBg:#1565c0;--variant-textBg:#1976d20a;--variant-outlinedBorder:#1976d2;--variant-outlinedBg:#1976d20a;}};padding:7px 21px;font-size:0.9375rem;;",
    "css-14x6zue": "font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:500;font-size:0.875rem;line-height:1.75;letter-spacing:0.02857em;text-transform:uppercase;min-width:64px;padding:6px 16px;border:0;border-radius:4px;transition:background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;&:hover{text-decoration:none;}&.Mui-disabled{color:rgba(0, 0, 0, 0.26);};padding:5px 15px;border:1px solid currentColor;border-color:var(--variant-outlinedBorder, currentColor);background-color:var(--variant-outlinedBg);color:var(--variant-outlinedColor);&.Mui-disabled{border:1px solid rgba(0, 0, 0, 0.12);};--variant-textColor:#2e7d32;--variant-outlinedColor:#2e7d32;--variant-outlinedBorder:#2e7d3280;--variant-containedColor:#fff;--variant-containedBg:#2e7d32;@media (hover: hover){&:hover{--variant-containedBg:#1b5e20;--variant-textBg:#2e7d320a;--variant-outlinedBorder:#2e7d32;--variant-outlinedBg:#2e7d320a;}};",
    "css-1vec1w": "font-family:\"Roboto\", \"Helvetica\", \"Arial\", sans-serif;font-weight:500;font-size:0.875rem;line-height:1.75;letter-spacing:0.02857em;text-transform:uppercase;min-width:64px;padding:6px 16px;border:0;border-radius:4px;transition:background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;&:hover{text-decoration:none;}&.Mui-disabled{color:rgba(0, 0, 0, 0.26);};padding:5px 15px;border:1px solid currentColor;border-color:var(--variant-outlinedBorder, currentColor);background-color:var(--variant-outlinedBg);color:var(--variant-outlinedColor);&.Mui-disabled{border:1px solid rgba(0, 0, 0, 0.12);};--variant-textColor:#d32f2f;--variant-outlinedColor:#d32f2f;--variant-outlinedBorder:#d32f2f80;--variant-containedColor:#fff;--variant-containedBg:#d32f2f;@media (hover: hover){&:hover{--variant-containedBg:#c62828;--variant-textBg:#d32f2f0a;--variant-outlinedBorder:#d32f2f;--variant-outlinedBg:#d32f2f0a;}};",
    "css-15hif23": "color:rgba(0, 0, 0, 0.6);;&:hover{background-color:#1976d20a;};&.Mui-checked, &.MuiCheckbox-indeterminate{color:#1976d2;}&.Mui-disabled{color:rgba(0, 0, 0, 0.26);};&:hover{@media (hover: none){background-color:transparent;}};",
    "css-5ol1ge": "padding:9px;border-radius:50%;color:rgba(0, 0, 0, 0.6);;&:hover{background-color:#1976d20a;};&.Mui-checked, &.MuiCheckbox-indeterminate{color:#1976d2;}&.Mui-disabled{color:rgba(0, 0, 0, 0.26);};&:hover{@media (hover: none){background-color:transparent;}};;",
    "css-1sw1jyb": "position:absolute;top:0;left:0;z-index:1;color:#fff;transition:left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;&.Mui-checked{transform:translateX(20px);}&.Mui-disabled{color:#f5f5f5;}&.Mui-checked + .MuiSwitch-track{opacity:0.5;}&.Mui-disabled + .MuiSwitch-track{opacity:0.12;}& .MuiSwitch-input{left:-100%;width:300%;}&:hover{background-color:#0000000a;@media (hover: none){background-color:transparent;}};&.Mui-checked{color:#1976d2;&:hover{background-color:#1976d20a;@media (hover: none){background-color:transparent;}}&.Mui-disabled{color:#a7caedff;}}&.Mui-checked + .MuiSwitch-track{background-color:#1976d2;};",
    "css-8cf21t": "padding:9px;border-radius:50%;position:absolute;top:0;left:0;z-index:1;color:#fff;transition:left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;&.Mui-checked{transform:translateX(20px);}&.Mui-disabled{color:#f5f5f5;}&.Mui-checked + .MuiSwitch-track{opacity:0.5;}&.Mui-disabled + .MuiSwitch-track{opacity:0.12;}& .MuiSwitch-input{left:-100%;width:300%;}&:hover{background-color:#0000000a;@media (hover: none){background-color:transparent;}};&.Mui-checked{color:#1976d2;&:hover{background-color:#1976d20a;@media (hover: none){background-color:transparent;}}&.Mui-disabled{color:#a7caedff;}}&.Mui-checked + .MuiSwitch-track{background-color:#1976d2;};;",
    "css-0": "",
    "css-19w1uun": "border-color:rgba(0, 0, 0, 0.23);",
    "css-19ri5qq": "\n  opacity: 0;\n  position: absolute;\n\n  &.MuiTouchRipple-rippleVisible {\n    opacity: 0.3;\n    transform: scale(1);\n    animation-name: animation-1taevns;\n    animation-duration: 550ms;\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  &.MuiTouchRipple-ripplePulsate {\n    animation-duration: 200ms;\n  }\n\n  & .MuiTouchRipple-child {\n    opacity: 1;\n    display: block;\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    background-color: currentColor;\n  }\n\n  & .MuiTouchRipple-childLeaving {\n    opacity: 0;\n    animation-name: animation-5ich1p;\n    animation-duration: 550ms;\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  }\n\n  & .MuiTouchRipple-childPulsate {\n    position: absolute;\n    /* @noflip */\n    left: 0px;\n    top: 0;\n    animation-name: animation-f6tr5a;\n    animation-duration: 2500ms;\n    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    animation-iteration-count: infinite;\n    animation-delay: 200ms;\n  }\n"
}

export default {
  blocks: [
    {
      id: 'getRegisteredStyles (original)',
      setup: () => {
        function getRegisteredStyles(registered, registeredStyles, classNames) {
          var rawClassName = '';
          classNames.split(' ').forEach(function (className) {
            if (registered[className] !== undefined) {
              registeredStyles.push(registered[className] + ";");
            } else {
              rawClassName += className + " ";
            }
          });
          return rawClassName;
        }

        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            const registeredStyles = []
            const newClassName = getRegisteredStyles(registered, registeredStyles, inputs[i])
            result += registeredStyles.length + newClassName.length
          }
          return result
        }
      },
    },
    {
      id: 'getRegisteredStyles (modified)',
      setup: () => {
        function getRegisteredStyles(registered, registeredStyles, classNames) {
          var rawClassName = '';
          classNames.split(' ').forEach(function (className) {
            if (registered[className] !== undefined) {
              registeredStyles.push(registered[className] + ";");
            } else if (className) {
              rawClassName += className + " ";
            }
          });
          return rawClassName;
        }

        return () => {
          let result = 0
          for (let i = 0; i < inputs.length; i++) {
            const registeredStyles = []
            const newClassName = getRegisteredStyles(registered, registeredStyles, inputs[i])
            result += registeredStyles.length + newClassName.length
          }
          return result
        }
      },
    },
  ]
}

function getStrings() {
return [
    "label:XXXXXX;background-color:#121212;color:#fff;transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;",
    "label:XXXXXX;border-radius:4px;",
    "label:XXXXXX;border:1px solid rgba(255, 255, 255, 0.12);",
    "box-shadow:var(--Paper-shadow);background-image:var(--Paper-overlay);",
    "label:XXXXXX;background-color:#121212;color:#fff;transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;;label:YYYYY;border-radius:4px;;;box-shadow:var(--Paper-shadow);background-image:var(--Paper-overlay);;;",
    "background-color:#121212;color:#fff;transition:box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;;;border-radius:4px;;;box-shadow:var(--Paper-shadow);background-image:var(--Paper-overlay);;;",
    "color:var(--variant-containedColor);label:ZZZZZZZ;background-color:var(--variant-containedBg);box-shadow:0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);&:hover{box-shadow:0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);@media (hover: none){box-shadow:0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12);}}&:active{box-shadow:0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12);}&.Mui-focusVisible{box-shadow:0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12);}&.Mui-disabled{color:rgba(255, 255, 255, 0.3);box-shadow:none;background-color:rgba(255, 255, 255, 0.12);}",
    "padding:5px 15px;border:1px solid currentColor;border-color:var(--variant-outlinedBorder, currentColor);background-color:var(--variant-outlinedBg);color:var(--variant-outlinedColor);&.Mui-disabled{border:1px solid rgba(255, 255, 255, 0.12);};label:ZZZZZZZZ",
]
}
