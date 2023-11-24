import React, { useEffect, useMemo, useState } from 'react'
import './index.css'
export const Example = () => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagePerdata] = useState(2)



    useEffect(() => {
        fetch('https://northwind.vercel.app/api/categories').then(response => response.json()).then(items => setData(items))
    }, [])

    const PageNumbers = []
    for (let i = 1; i <= Math.ceil(data.length / pagePerdata); i++) {

        PageNumbers.push(i)
    }

    const lastElementIndex = currentPage * pagePerdata
    const firstElementIndex = lastElementIndex-pagePerdata

    const PageDatas = useMemo(() => data.slice(firstElementIndex, lastElementIndex),[data, currentPage]);
    console.log(PageDatas);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    
                       { PageDatas.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                            </tr>
                        ))}
                    
                </tbody>
            </table>

            <div>
                {
                    PageNumbers.map((page => (
                        <button className='bot' key={page} onClick={() => setCurrentPage(page)}>{page}</button>
                    )))
                }
            </div>
        </>
    );
};

export default Example
