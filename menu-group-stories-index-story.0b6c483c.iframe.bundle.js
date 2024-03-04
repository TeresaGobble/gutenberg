"use strict";(globalThis.webpackChunkgutenberg=globalThis.webpackChunkgutenberg||[]).push([[5619],{"./packages/components/src/menu-group/stories/index.story.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,WithSeperator:()=>WithSeperator,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/react/index.js"),___WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./packages/components/src/menu-group/index.tsx"),_menu_item__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./packages/components/src/menu-item/index.tsx"),_menu_items_choice__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./packages/components/src/menu-items-choice/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/MenuGroup",component:___WEBPACK_IMPORTED_MODULE_1__.Z,argTypes:{children:{control:{type:null}}},parameters:{sourceLink:"packages/components/src/menu-group",controls:{expanded:!0},docs:{canvas:{sourceState:"shown"}}}},Template=args=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.Z,{...args,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_menu_item__WEBPACK_IMPORTED_MODULE_2__.Z,{children:"Menu Item 1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_menu_item__WEBPACK_IMPORTED_MODULE_2__.Z,{children:"Menu Item 2"})]});Template.displayName="Template";const Default=Template.bind({}),WithSeperator=(args=>{const[mode,setMode]=(0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)("visual");return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment,{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(___WEBPACK_IMPORTED_MODULE_1__.Z,{label:"View",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_menu_item__WEBPACK_IMPORTED_MODULE_2__.Z,{children:"Top Toolbar"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_menu_item__WEBPACK_IMPORTED_MODULE_2__.Z,{children:"Spotlight Mode"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_menu_item__WEBPACK_IMPORTED_MODULE_2__.Z,{children:"Distraction Free"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(___WEBPACK_IMPORTED_MODULE_1__.Z,{...args,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_menu_items_choice__WEBPACK_IMPORTED_MODULE_4__.Z,{choices:[{value:"visual",label:"Visual editor"},{value:"text",label:"Code editor"}],value:mode,onSelect:newMode=>setMode(newMode),onHover:()=>{}})})]})}).bind({});WithSeperator.args={...Default.args,hideSeparator:!1,label:"Editor"},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => {\n  return <MenuGroup {...args}>\n            <MenuItem>Menu Item 1</MenuItem>\n            <MenuItem>Menu Item 2</MenuItem>\n        </MenuGroup>;\n}",...Default.parameters?.docs?.source}}},WithSeperator.parameters={...WithSeperator.parameters,docs:{...WithSeperator.parameters?.docs,source:{originalSource:"args => {\n  const [mode, setMode] = useState('visual');\n  const choices = [{\n    value: 'visual',\n    label: 'Visual editor'\n  }, {\n    value: 'text',\n    label: 'Code editor'\n  }];\n  return <>\n            <MenuGroup label={'View'}>\n                <MenuItem>Top Toolbar</MenuItem>\n                <MenuItem>Spotlight Mode</MenuItem>\n                <MenuItem>Distraction Free</MenuItem>\n            </MenuGroup>\n            <MenuGroup {...args}>\n                <MenuItemsChoice choices={choices} value={mode} onSelect={(newMode: string) => setMode(newMode)} onHover={() => {}} />\n            </MenuGroup>\n        </>;\n}",...WithSeperator.parameters?.docs?.source},description:{story:"When other menu items exist above or below a MenuGroup, the group\nshould have a divider line between it and the adjacent item.",...WithSeperator.parameters?.docs?.description}}};try{WithSeperator.displayName="WithSeperator",WithSeperator.__docgenInfo={description:"When other menu items exist above or below a MenuGroup, the group\nshould have a divider line between it and the adjacent item.",displayName:"WithSeperator",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/components/src/menu-group/stories/index.story.tsx#WithSeperator"]={docgenInfo:WithSeperator.__docgenInfo,name:"WithSeperator",path:"packages/components/src/menu-group/stories/index.story.tsx#WithSeperator"})}catch(__react_docgen_typescript_loader_error){}}}]);