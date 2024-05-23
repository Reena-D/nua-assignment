import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";

const BooksTable = () => {

    const [data, setData] = useState();
    const [search, setSearch] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    //const [title, setTitle] = useState("");
    const handleBook=() => {
        fetch("https://openlibrary.org/search.json?q=t&page=20")           
          .then((response) => response.json())
          .then((data) => setData(data.docs))      
    }

    useEffect(() => {
      
         handleBook();
         //handleFetch();
      }, []);

      const handleFetch=async() => {
        
        fetch("https://openlibrary.org/search/authors.json?q=j")
        .then((response) => response.json())
        .then((data1) => setSearch(data1.docs))
        
    }

    const handleSortByBook= async () =>{
      const {book} = await axios.get(`https://openlibrary.org/search.json?q=t`);
      console.log(book)
      book?.sort((a,b) => a.docs.ratings_average - b.docs.ratings_average)
      setData(book)
    }
   

 const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => 
    setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data?.length /
     itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    // const csvData = [
    //   ["Book Title", "Author Name",],
    //   ...data?.map(({ title, author_name,  }) => [
    //    title, author_name,
    //   ]),
    // ];


  return (
    <div>
    <div className='flex'>
      <aside className="min-w-60 bg-slate-300 p-5 font-bold">Dashboard</aside>
      
       {/* <CSVLink className=" bg-orange-300 text-slate-800 rounded-md p-2 m-2" filename="my-file.csv" data={csvData}>
        Export to CSV
      </CSVLink> */}
      <div className='flex flex-col m-2'>
      <input className='m-2 bg-neutral-100 rounded-md p-3 w-13' placeholder='Search for books'></input>
        <table className='table border-2'>
                <tr className='m-6 p-5 border-2 text-orange-500 text-lg'>
                    
                    <th className='border-2'>Book Title</th>
                    <th className='border-2'>Author Name</th>
                    <th className='border-2'>Average Rating</th>
                    <th className='border-2'>First Publish Year</th>
                    <th className='border-2'>Subjects</th>

                </tr>
                {currentItems?.map((val, key) => {
                        return (
                            <tr key={key} className='font-semibold border-2'>
                              
                                <td className='px-5 w-80 border-2'>{val.title}</td>
                                <td className='px-5 border-2'>{val.author_name}</td>
                                <td className='px-5 border-2'>{val.ratings_average}</td>
                                <td className='px-5 border-2'>{val.first_publish_year}</td>
                                <td className='px-5 border-2 w-80'>{val.subject}</td>
                 
                            </tr>
                        )
                    })}
           </table>
           </div>
            {/* <table className='table'>
                <tr className='m-2 p-2 text-orange-500'>                    
                    <th>Author Birth Year</th>
                    <th>Author Top Work</th>                   
                </tr>
                {search?.map((val, key) => {
                     
                    return (
                        <tr key={key} className='font-semibold'>                     
                            <td className='px-5'>{val.birth_date}</td>
                            <td className='px-5'>{val.top_work}</td>                                                   
                        </tr>
                    )
                })} 
                </table> */}
                
        </div>
        <span className='flex justify-center m-3 font-semibold'>View
        <select
          value={itemsPerPage}
          className="font-bold text-orange-700"

          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
          }}>
          {[10,20,40,50,80,100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <span className='bg-gray-200 p-1 rounded-sm'>books per page</span>
        </span>
           <ul className="flex gap-2 justify-center
                            flex-wrap mt-8">
                {pageNumbers.map((number) => (
                    <li key={number} className="">
                        <button
                            onClick={() => paginate(number)}
                            className={`px-3 py-1 rounded-full 
                            ${currentPage === number
                                ? 'bg-green-700 text-white'
                                : 'bg-gray-200 text-gray-700'
                                }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
     
        </div>
  )
}

export default BooksTable
