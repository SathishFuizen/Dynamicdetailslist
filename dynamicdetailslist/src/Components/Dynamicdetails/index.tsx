import * as React from 'react';
import {useState, useEffect} from 'react';
// import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { TooltipHost } from '@fluentui/react';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import ReactPaginate from 'react-paginate';



// const createobj = (ch:any) =>{
//   const [choiceobj,setchoiceobj] = useState<any>([])
//   setchoiceobj((prev: any)=>[...prev,{ key: 'column1',
//   name: ch,
//   className: classNames.fileIconCell,
//   iconClassName: classNames.fileIconHeaderIcon,
//   ariaLabel: 'Column operations for File type, Press to sort on File type',
//   iconName: 'Page',
//   isIconOnly: true,
//   fieldName: 'name',
//   minWidth: 16,
//   maxWidth: 16}])
 
// }
// console.log(choiceobj)
// choiceobj.map((item:any)=>{
//   return(

//   )
  
// })
// useEffect(()=>{
  
// createobj();

// })

  
const classNames = mergeStyleSets({
  fileIconHeaderIcon: {
    padding: 0,
    fontSize: '16px',
  },
  fileIconCell: {
    textAlign: 'center',
    selectors: {
      '&:before': {
        content: '.',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0px',
        visibility: 'hidden',
      },
    },
  },
  fileIconImg: {
    verticalAlign: 'middle',
    maxHeight: '16px',
    maxWidth: '16px',
  },
  controlWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  exampleToggle: {
    display: 'inline-block',
    marginBottom: '10px',
    marginRight: '30px',
  },
  selectionDetails: {
    marginBottom: '20px',
  },
});
const controlStyles = {
  root: {
    margin: '0 30px 20px 0',
    maxWidth: '300px',
  },
};
interface Item {
  id: number;
  name: string;
}
export interface IDetailsListDocumentsExampleState {
  
  columns: IColumn[];
  items: IDocument[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
}
export interface IDocument {
  key: string;
  name: string;
  value: string;
  iconName: string;
  fileType: string;
  modifiedBy: string;
  dateModified: string;
  dateModifiedValue: number;
  fileSize: string;
  fileSizeRaw: number;
}
const DetailsListDocumentsExample: any= (props:any) =>{
  const [choiceobj,setchoiceobj] = useState<any>([])
  const [items, setItems] = useState<any>([]);
  function randomDate(start:Date, end:Date) {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return {
      value: date.valueOf(),
      dateFormatted: date.toLocaleDateString(),
    };
  }
  const _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    
    const newColumns: IColumn[] = columns.slice();
    //console.log(newColumns);
    
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    //console.log(currColumn);
    
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        setAnnouncedMessage(`${currColumn.name} is sorted ${
               currColumn.isSortedDescending ? 'descending' : 'ascending'
             }`)
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const allItems = generateDocuments();
    console.log(allItems)
   setItems(allItems);
   console.log(items);
    const newItems = _copyAndSort(allItems, currColumn.fieldName!, currColumn.isSortedDescending);
    setColumns(newColumns)
    setItems(newItems)
    
  };
 
  
 
function _copyAndSort<T>(items:any, columnKey: string, isSortedAscending?: boolean): any {
  console.log(items,columnKey,isSortedAscending);
  
  console.log(items,columnKey,isSortedAscending);
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: any, b: any) => ((isSortedAscending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}
const [items1, setItems1] = useState<Item[]>([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
  { id: 6, name: 'Item 6' },
  { id: 7, name: 'Item 7' },
  { id: 8, name: 'Item 8' },
  { id: 9, name: 'Item 9' },
  { id: 10, name: 'Item 10' },
  { id: 11, name: 'Item 11' },
  { id: 12, name: 'Item 12' },
  { id: 13, name: 'Item 13' },
  { id: 14, name: 'Item 14' },
  { id: 15, name: 'Item 15' },
]);
const itemsPerPage = 5;
 const [currentPage, setCurrentPage] = useState(1);
 const totalPages = Math.ceil(items.length / itemsPerPage);
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
 const handlePageClick = (event:any) => {
  const newOffset = (event.selected * itemsPerPage) % items.length;
  console.log(
    `User requested page number ${event.selected}, which is offset ${newOffset}`
  );
  setCurrentPage(newOffset);
};
  const cols: IColumn[] = [
    {
      key: 'column1',
      name: 'File Type',
      className: classNames.fileIconCell,
      iconClassName: classNames.fileIconHeaderIcon,
      ariaLabel: 'Column operations for File type, Press to sort on File type',
      iconName: 'Page',
      isIconOnly: true,
      fieldName: 'name',
      minWidth: 16,
      maxWidth: 16,
      onColumnClick: _onColumnClick,
      onRender: (item: IDocument) => (
        <TooltipHost content={`${item.fileType} file`}>
          <img src={item.iconName} className={classNames.fileIconImg} alt={`${item.fileType} file icon`} />
        </TooltipHost>
      ),
    },
    {
      key: 'column2',
      name: 'Name',
      fieldName: 'name',
      minWidth: 210,
      maxWidth: 350,
      isRowHeader: true,
      isResizable: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: 'Sorted A to Z',
      onColumnClick: _onColumnClick,
      data: 'string',
      isPadded: true,
    },
    {
      key: 'column3',
      name: 'Date Modified',
      fieldName: 'dateModifiedValue',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      onColumnClick: _onColumnClick,
      data: 'number',
      onRender: (item: IDocument) => {
        return <span>{item.dateModified}</span>;
      },
      isPadded: true,
    },
    {
      key: 'column4',
      name: 'Modified By',
      fieldName: 'modifiedBy',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      isCollapsible: true,
      data: 'string',
      onColumnClick: _onColumnClick,
      onRender: (item: IDocument) => {
        return <span>{item.modifiedBy}</span>;
      },
      isPadded: true,
    },
    {
      key: 'column5',
      name: 'File Size',
      fieldName: 'fileSizeRaw',
      minWidth: 70,
      maxWidth: 90,
      isResizable: true,
      isCollapsible: true,
      data: 'number',
      onColumnClick: _onColumnClick,
      onRender: (item: IDocument) => {
        return <span>{item.fileSize}</span>;
      },
    },
  ];
  const [columns, setColumns] = useState<IColumn[]>(cols);
  const [selectionDetails, setSelectionDetails] = useState<string>('');
  const [isModalSelection, setIsModalSelection] = useState<boolean>(false);
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);
  const [announcedMessage, setAnnouncedMessage] = useState<string | undefined>(undefined);
  
  const setGenerateDocument=()=>{
    const allItems = generateDocuments();
    setItems(allItems,);
    console.log(items);
  }
  useEffect(() => {
    setGenerateDocument();
    renderList()
  },[])

  useEffect(()=>{
    console.log(choiceobj);
    
  },[choiceobj])
  
  const createList = () =>{
    console.log(choiceobj);
    console.log(currentItems);
    
    return(
      <>
      <DetailsList
            items={props.rowdata}
            compact={isCompactMode}
            columns={choiceobj}
            selectionMode={SelectionMode.multiple}
            getKey={_getKey}
            setKey="multiple"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={_selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={_onItemInvoked}
            enterModalSelectionOnTouch={true}
          />
          <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
        </>
    )
  }
  
  // useEffect(()=>{
  // },[items])
  
  const renderList = () =>{
    console.log(props.column);
    
    let colObj:any = [];
    // eslint-disable-next-line array-callback-return
    props.column.map((x:any,i:any)=>{
      console.log(x);
      console.log(`column${i+1}`);
      console.log(i);
      
      colObj.push({
       key: `column${i+1}`,
      name: x,
      ariaLabel: 'Column operations for File type, Press to sort on File type',

      fieldName: `${x}`,
      minWidth: 100,
      maxWidth: 200}
      )
      
      // setchoiceobj((prev: any)=>[...prev,{ key: 'column1',
      // name: x,
      // className: classNames.fileIconCell,
      // iconClassName: classNames.fileIconHeaderIcon,
      // ariaLabel: 'Column operations for File type, Press to sort on File type',
      // iconName: 'Page',
      // isIconOnly: true,
      // fieldName: 'name',
      // minWidth: 16,
      // maxWidth: 16}])
    
     
    })

    console.log(colObj);
    setchoiceobj(colObj)

  
    
  }


function randomFileSize() {
  const fileSize = Math.floor(Math.random() * 100) + 30;
  return {
    value: `${fileSize} KB`,
    rawSize: fileSize,
  };
}
let loremIndex = 0;
function lorem(wordCount:any) {
  const LOREM_IPSUM = (
    'As there we have added so many logic we will need at'+
    ' least 3 scenarios: one with the initial value 1, '+
    'another with a middle value and another with the maximum number.'
  ).split(' ');
 
  const startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0: loremIndex;
  loremIndex = startIndex + wordCount;
  console.log(loremIndex);
  console.log(LOREM_IPSUM.slice(startIndex, loremIndex).join(' '));
  return LOREM_IPSUM.slice(startIndex, loremIndex).join(' ');
}
function generateDocuments() {
  function randomFileIcon() {
    const docType = FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
    return {
      docType,
      url: `https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets/item-types/16/${docType}.svg`,
    };
  }
  const items = [];
  for (let i = 0; i < 50; i++) {
    const randomDateObj = randomDate(new Date(2012, 0, 1), new Date());
    const randomFileSizeObj = randomFileSize();
    const randomFileTypeObj = randomFileIcon();
    let fileName = lorem(2);
    console.log(fileName);
    fileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    //+ fileName.slice(1).concat(`.${randomFileTypeObj.docType}`);
    console.log(fileName);
    let userName = lorem(2);
    userName = userName
      .split(' ')
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(' ');
    items.push({
      key: i.toString(),
      name: fileName,
      value: fileName,
      iconName: randomFileTypeObj.url,
      fileType: randomFileTypeObj.docType,
      modifiedBy: userName,
      dateModified: randomDateObj.dateFormatted,
      dateModifiedValue: randomDateObj.value,
      fileSize: randomFileSizeObj.value,
      fileSizeRaw: randomFileSizeObj.rawSize,
    });
  }
  console.log(items)
  return items;
}
 
  const FILE_ICONS: { name: string }[] = [
    { name: 'accdb' },
    { name: 'audio' },
    { name: 'code' },
    { name: 'csv' },
    { name: 'docx' },
    { name: 'dotx' },
    { name: 'mpp' },
    { name: 'mpt' },
    { name: 'model' },
    { name: 'one' },
    { name: 'onetoc' },
    { name: 'potx' },
    { name: 'ppsx' },
    { name: 'pdf' },
    { name: 'photo' },
    { name: 'pptx' },
    { name: 'presentation' },
    { name: 'potx' },
    { name: 'pub' },
    { name: 'rtf' },
    { name: 'spreadsheet' },
    { name: 'txt' },
    { name: 'vector' },
    { name: 'vsdx' },
    { name: 'vssx' },
    { name: 'vstx' },
    { name: 'xlsx' },
    { name: 'xltx' },
    { name: 'xsn' },
  ];
  function _getKey(item: any, index?: number): string {
    return item.key;
  }
  function _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }
  
  function onChangeCompactMode  (event: React.MouseEvent<HTMLElement>, checked?: boolean) : void  {
    setIsCompactMode(checked ?? false);
  }
   
  function _getSelectionDetails(): string {
    const selectionCount = _selection.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (_selection.getSelection()[0] as IDocument).name;
      default:
        return `${selectionCount} items selected`;
    }
  }
 
  const _selection = new Selection({
    onSelectionChanged: () => {
     setSelectionDetails(_getSelectionDetails)
    },
  });
 
  
    return(
      <>
      <div>test
            <Toggle
            label="Enable compact mode"
            checked={isCompactMode}
            onChange={onChangeCompactMode}
            onText="Compact"
            offText="Normal"
            styles={controlStyles}
          />
      {}
      <DetailsList
            items={currentItems}
            compact={isCompactMode}
            columns={columns}
            selectionMode={SelectionMode.multiple}
            getKey={_getKey}
            setKey="multiple"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            selection={_selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={_onItemInvoked}
            enterModalSelectionOnTouch={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          />
</div>
<div>
<div>
      {/* Render the items */}
      {currentItems.map((item:any) => (
        <div key={item.name}></div>
      ))}
      {/* Pagination */}
      {/* <div>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
        <IoIosArrowBack/>
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            disabled={currentPage === pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
        <IoIosArrowForward/>
        </button>
      </div> */}




    </div>
    </div>
    <div>
      { 
      createList()
      }
    </div>
    </>
    )
    
  }
export default DetailsListDocumentsExample;