import React from 'react';
import styles from './styles.module.scss';
import Button from '../Button';

const SelectedItems = ({ currentlySelected ,totalAmount,setShowSelected,setShow}) => {

  const foodItemHeadings =['Item Name','Item Cost','Selected Count','Item Total Cost'];
 const customStyle={
    backgroundColor:'#022b50'
 }
 const handleBack=()=>{
    setShowSelected(false);
 }

 const handleNext=()=>{
    setShow(true);
    setShowSelected(false);
 }
  return (
    <>
      <header className={styles.selectedheader}>
        <h1>Selected Items</h1>
      </header>
      <main className={styles.selectedItemList}>
        <section>
            <table>
                <thead>
                   {foodItemHeadings.map((title,index)=>(
                    <th key={index}>{title}</th>
                   ))}
                </thead>
                <tbody>
          {Object.values(currentlySelected).map((item, index) => (
           <tr key={index}>
            <td>{item?.name}</td>
            <td>{item?.cost}</td>
            <td>{item?.selectedCount}</td>
            <td>{item?.cost * item?.selectedCount}</td>
           </tr>
          ))}
          </tbody>
          </table>
        </section>
        <section className={styles.buttonContainer}>
        <Button title={`Edit`} customStyle={...customStyle} handleClick={handleBack}/>
        <Button title={`Pay ₹${totalAmount}`} handleClick={handleNext}/>
        </section>
      </main>
    </>
  );
};

export default SelectedItems;
