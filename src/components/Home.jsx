import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { addNurses, deleteNurses, getNurses, updateNurses } from './apis/Apis'
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DownloadTableExcel } from 'react-export-table-to-excel';



export default function Home() {
    const [nurse, setNurse] = useState([])
    const [addNurse, setAddnurse] = useState({})
    const [search, setSearch] = useState([])
    const [editNurse, setEditNurse] = useState({})
    const notify = () => toast("Record Added Succesfully");
    const deleteNotify = () => toast("Record Deleted Succesfully");
    const updateNotify = () => toast("Record Updated Succesfully");
    const tableRef = useRef(null);

    const handlechange = (e) => {
        const { name, value } = e.target
        setAddnurse({ ...addNurse, [name]: value })
    }

    const editNurseItem = (nurse) => {
        setEditNurse(nurse)
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditNurse({ ...editNurse, [name]: value })
    }

    useEffect(() => {
        const fetchNurses = async () => {
            try {
                const res = await axios.get(getNurses)
                setNurse(res.data.data)
                setSearch(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchNurses()
    }, [])



    const submit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(addNurses, addNurse)
            notify()
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    }

    const updateNurse = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${updateNurses}/${editNurse.id}`, editNurse)
            updateNotify()
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteNurse = async (id) => {
        try {
            const res = await axios.delete(`${deleteNurses}/${id}`)
            deleteNotify()
            setSearch(nurse.filter((nurse) => nurse.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (e) => {
        const searchcon = (e.target.value).toLowerCase()
        setSearch(nurse.filter(item => item.nurseName.toLowerCase().includes(searchcon)))
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className='d-flex'>
                <button className="btn btn-warning btn-sm mx-2" onClick={() => setEditNurse(rowData)} data-bs-toggle="modal" data-bs-target="#editModal">
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteNurse(rowData.id)}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        )
    }

    const serialNumberTemplate = (rowData, { rowIndex }) => {
        return rowIndex + 1;
    };

    return (
        <div>
            <div className="containert">
                <div className='card'>
                    <h2>Nurse Management</h2>
                    <h4>Using Reactjs , node js and Mysql</h4>
                    <div className='card-body'>
                        <div className='d-flex justify-content-end my-3'>
                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#addModal">Add Record</button>
                        </div>
                        <div className='d-flex justify-content-end my-3'>
                            <input class="form-control me-2" type="search" onChange={handleSearch} style={{ width: '250px' }} placeholder="Search" aria-label="Search"></input>
                            <DownloadTableExcel
                                filename="Nurses data"
                                sheet="Nurses"
                                currentTableRef={tableRef.current?.getTable()}
                            >

                                <button className='btn btn-info'> Export excel </button>

                            </DownloadTableExcel>
                        </div>

                        <DataTable value={search} showGridlines stripedRows tableStyle={{ minWidth: '50rem', border: '1px solid #ccc' }} ref={tableRef}>

                            <Column body={serialNumberTemplate} header="S.No" style={{ width: '10%', border: '1px solid #ddd' }} />
                            <Column field="nurseName" header="Name" sortable style={{ width: '25%', border: '1px solid #ddd' }}></Column>
                            <Column field="licenseNo" header="License No" sortable style={{ width: '25%', border: '1px solid #ddd' }}></Column>
                            <Column field="age" header="Age" sortable style={{ width: '25%', border: '1px solid #ddd' }}></Column>
                            <Column field="dob" header="D.O.B" sortable style={{ width: '25%', border: '1px solid #ddd' }}></Column>
                            <Column body={actionBodyTemplate} header="Actions" style={{ width: '15%', border: '1px solid #ddd' }} />
                        </DataTable>
                    </div>

                </div>

            </div>
            <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Add Record</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id='addNurseForm'>
                                <div class="mb-3 ">
                                    <div className='d-flex justify-content-start'>
                                        <label>Name</label>
                                    </div>
                                    <input type="text" className="form-control" name='name' onChange={handlechange} placeholder='Enter Name' />
                                </div>
                                <div class="mb-3">
                                    <div className='d-flex justify-content-start'>
                                        <label>License No</label>
                                    </div>
                                    <input type="text" className="form-control" name='license' onChange={handlechange} placeholder='Enter License No' />
                                </div>
                                <div class="mb-3">
                                    <div className='d-flex justify-content-start'>
                                        <label>Age</label>
                                    </div>
                                    <input type="number" className="form-control" name='age' onChange={handlechange} placeholder='Enter Age' />
                                </div>
                                <div class="mb-3 form-group">
                                    <div className='d-flex justify-content-start'>
                                        <label>D.O.B</label>
                                    </div>
                                    <input type="date" className="form-control" name='dob' onChange={handlechange} placeholder='Enter DOB' />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => submit(e)}>Save </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id={`editModal`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit {editNurse.nurseName} Record</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id='addNurseForm'>
                                <div class="mb-3 ">
                                    <div className='d-flex justify-content-start'>
                                        <label>Name</label>
                                    </div>
                                    <input type="text" className="form-control" name='nurseName' value={editNurse.nurseName} onChange={handleEditChange} placeholder='Enter Name' />
                                </div>
                                <div class="mb-3">
                                    <div className='d-flex justify-content-start'>
                                        <label>License No</label>
                                    </div>
                                    <input type="text" className="form-control" name='licenseNo' value={editNurse.licenseNo} onChange={handleEditChange} placeholder='Enter License No' />
                                </div>
                                <div class="mb-3">
                                    <div className='d-flex justify-content-start'>
                                        <label>Age</label>
                                    </div>
                                    <input type="number" className="form-control" name='age' value={editNurse.age} onChange={handleEditChange} placeholder='Enter Age' />
                                </div>
                                <div class="mb-3 form-group">
                                    <div className='d-flex justify-content-start'>
                                        <label>D.O.B</label>
                                    </div>
                                    <input type="date" className="form-control" name='dob' value={editNurse.dob} onChange={handleEditChange} placeholder='Enter DOB' />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={(e) => updateNurse(e)}>Save </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
