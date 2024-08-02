import { Select, Table, Input, message, Popconfirm } from "antd";
import { axiosInstance } from "./Axios";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Button } from "antd/es/radio";
import React from 'react';
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  CloseOutlined 
} from '@ant-design/icons';
import CreationForm from "./Components/CreationForm";
import { Response, Student } from "./types";

const App: React.FC = () => {


  const fetchStudents = async (): Promise<void> => {
    const response: AxiosResponse<Student[]> = await axiosInstance.get("/students");
    setStudents(response.data)
  };
  const [students, setStudents] = useState<Student[]>([]);

  const [sortOption, setSortOption] = useState<string>('fname');


  const [filterOption, setFilterOption] = useState("all");
   
  const { Search } = Input;

  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);



  // const sort = (direction: string): void => {
  //   const sortedStudents = [...students].sort((a, b) => 
  //     direction.toUpperCase() === "ASC" 
  //       ? a.fname.localeCompare(b.fname) 
  //       : b.fname.localeCompare(a.fname)
  //   );
  //   setStudents(sortedStudents);
  // };

  const sort = async(direction: string): Promise<void> =>{
    const response : AxiosResponse<Student[]> = await axiosInstance.get(`/students/sort?field=${sortOption}&direction=${direction}`);
    setStudents(response.data)
  }


  const search = async(value: string): Promise<void>=>{
    if(filterOption==="all"){
      const response: AxiosResponse<Student[]> = await axiosInstance.get("/students")
      setStudents(response.data)
      return
    }
    const response: AxiosResponse<Student[]> = await axiosInstance.get(`/students/search?field=${filterOption}&keyword=${value}`)
    setStudents(response.data)
  }

  const [messageApi, contextHolder] = message.useMessage();
  const create = async(values: Student): Promise<void> =>{
    const response: AxiosResponse<Response> = await axiosInstance.post("/students", values)
    const updatedStudentsList = [...students, response.data.student]
    setStudents(updatedStudentsList);
    messageApi.success(response.data.message);
    setIsCreate(false)
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  const confirm = async (id: string) => {
    try {
      const response: AxiosResponse<Response> = await axiosInstance.delete(`/students/${id}`)
      const updatedStudents = students.filter((student)=>student._id!=id)
      setStudents(updatedStudents)
      message.success(response.data.message);
    } catch (error) {
      message.error('Failed to delete the student')
    }
  };

  const [toUpdateStudent, setToUpdateStudent] = useState<Student>()
  // const show = async(id: string): Promise<void>=>{
  //   const response: AxiosResponse<Student> = await axiosInstance.get(`/students/${id}`)
  //   setToUpdateStudent(response.data)
  // }
  
  const update = async(values: Student, id?: string ): Promise<void>=>{
   try {
    const response: AxiosResponse<Response> = await axiosInstance.put(`/students/${id}`, values)
    const updatedStudent = students.map(student => student._id ===id ? response.data.student : student)    
    setStudents(updatedStudent)
    setIsUpdate(false)
   } catch (error) {
    messageApi.info('Failed to update student');
   }
  }

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "First name",
      dataIndex: "fname",
      key: "First name",
    },
    {
      title: "Last name",
      dataIndex: "lname",
      key: "Last name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "Email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "Phone",
    },
    {
      title: "Cin",
      dataIndex: "cin",
      key: "Cin",
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Student) => (
        <div className=" space-x-4">
          <a className="text-[#4096ff] hover:text-[#1b6ef5] hover:underline " onClick={()=>{setToUpdateStudent(record ?? ''); setIsCreate(false) ; setIsUpdate(true); setTimeout(()=>window.scrollBy(0, 500), 100)}}>Update</a>
          <Popconfirm
          placement="bottom"
          title={"Are you sure to delete this student?"}
          description={"Delete the student"}
          onConfirm={()=>confirm(record._id ?? '')}
          okText="Yes"
          cancelText="No"
        >
          <a className="text-[#4096ff] hover:text-[#1b6ef5] hover:underline">Delete</a>
        </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
    {contextHolder}
    <div className=" h-screen flex justify-center items-center">
      <div className="w-[70%]">
        <div className="flex justify-between">
          <Button className="mb-2 rounded-md bg-[#4096ff] text-white hover:text-white hover:bg-[#1b6ef5]" type="primary"  onClick={()=>{setIsUpdate(false); setIsCreate(true); setTimeout(()=>window.scrollBy(0, 500), 100)}}>Add a student</Button>
          <div>
            <Select defaultValue={"all"} onChange={(value: string)=>setFilterOption(value)} options={[
              { value: 'all', label: <span>All</span> },
              { value: '_id', label: <span>ID</span> },
              { value: 'fname', label: <span>Fname</span> },
              { value: 'lname', label: <span>Lname</span> },
              { value: 'email', label: <span>Email</span> },
              { value: 'phone', label: <span>Phone</span> },
              { value: 'cin', label: <span>Cin</span> }
              ]} />
            <Search className="w-[300px]"
              placeholder="input search text"
              allowClear
              enterButton="Search"
              onSearch={(value: string)=>search(value)}
            />
            </div>
          <div className="space-x-2 ">
            <Select defaultValue={"_id"} onChange={(value: string)=>setSortOption(value)} options={[
              { value: '_id', label: <span>ID</span> },
              { value: 'fname', label: <span>Fname</span> },
              { value: 'lname', label: <span>Lname</span> },
              { value: 'email', label: <span>Email</span> },
              { value: 'phone', label: <span>Phone</span> },
              { value: 'cin', label: <span>Cin</span> }
              ]} />
              <Button className="bg-[#4096ff] text-white rounded-md  hover:text-white hover:bg-[#1b6ef5]" onClick={()=>sort("ASC")}><SortAscendingOutlined /></Button>
              <Button className="bg-[#4096ff] text-white rounded-md  hover:text-white hover:bg-[#1b6ef5]" onClick={()=>sort("DESC")}><SortDescendingOutlined /></Button>
          </div>
        </div>
        <div>
          <Table dataSource={students} columns={columns} />
         
        </div>


      </div>
    </div>
     <div className="flex justify-center  relative -top-28">
      {isCreate && 
        <div className="bg-white  w-1/2 rounded-md mb-10">
          <div className="bg-[#fafafa] h-8 border-b-2 flex justify-center items-center text-lg font-semibold text-[#1e1e1e] py-8 rounded-md mb-4 relative">
            <p>Create a new student </p>
            <button className="px-[4px] border rounded-md  border-gray-600 absolute right-2 top-2" onClick={()=>setIsCreate(false)}><CloseOutlined className="text-sm text-gray-600 " /></button>
          </div>
          <div className="flex justify-center items-center"><CreationForm manage={create}/></div>
        </div>
      }

      {isUpdate && 
        <div className="bg-white  w-1/2 rounded-md mb-10">
          <div className="bg-[#fafafa] h-8 border-b-2 flex justify-center items-center text-lg font-semibold text-[#1e1e1e] py-8 rounded-md mb-4 relative">
            <p>Update a student </p>
            <button className="px-[4px] border rounded-md  border-gray-600 absolute right-2 top-2" onClick={()=>setIsUpdate(false)}><CloseOutlined className="text-sm text-gray-600 " /></button>
          </div>
          <div className="flex justify-center items-center"><CreationForm manage={update} student={toUpdateStudent}/></div>
        </div>
      }
     </div>
    </>
  );
};

export default App;
