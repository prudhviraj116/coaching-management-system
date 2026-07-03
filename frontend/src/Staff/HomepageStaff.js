
import '../App.css';
import { useState } from 'react';
import { Routes,Route,Link } from 'react-router-dom';
import Form from './InsertNewStudent';
import AttendancePage from '../Staff/Attendance';
import Dashboard1 from '../Staff/StaffDashboard';
import AddAttendance from '../Staff/AttendanceStudent';
import AttendanceAdding from '../Staff/AttendanceAdding';
import VideoForm from '../Staff/VideoForm';
import AttendanceUpdate from '../Staff/AttendanceUpdate';
import AttendanceUpdate1 from '../Staff/Testing';
import BatchManagement from '../Staff/BatchManagement';
import ResumeViewed from '../Staff/ResumeViewed';
import PaymentPage from './PaymentPage';
import NewStudentUpdate from '../Staff/Newstudentupdate';
import StaffTaskCenter from '../Staff/StaffTaskCenter';
import DeleteStudent from '../Staff/DeleteStudent';
import StudentView from '../Staff/StudentView';
import StaffNotifications from '../Staff/StaffNotification';
import OutstandingFeesAndPayment from './OutstandingFees';

function Staffhome() {
  const [view ,setView] = useState('false');
  
  const renderComponent = () => {
    switch (view) {
      case 'false':
        return ;
      case 'Form':
        return <Form setView={setView}/>;
      case 'update':
        return <NewStudentUpdate setView={setView}/>;
      case 'delete':
          return <DeleteStudent setView={setView}/>;
      case 'view':
            return <StudentView setView={setView}/>;
      case 'testing':
        return <AttendanceUpdate1 setView={setView}/>;

      case 'Attendancepage':
        return <AddAttendance/>;

      case 'Add':
          return <AttendanceAdding setView={setView}/>;
      
      case 'updateAttendence':
          return <AttendanceUpdate setView={setView}/>;
      case 'batch':
        return <BatchManagement setView={setView}/>;
      case 'video':
          return <VideoForm setView={setView}/>;
      case 'task':
            return <StaffTaskCenter setView={setView}/>;
      case 'notifications':
        return <StaffNotifications setView={setView}/>;
      case 'resume':
        return <ResumeViewed setView={setView}/>;
      case 'payment':
        return <PaymentPage setView={setView}/>;
      case 'fee':
        return <OutstandingFeesAndPayment setView={setView}/>;

     
      default:
        return setView;
    }
  };

  return (
    <div>
      <Dashboard1 setView={setView} />
      {renderComponent()}
    </div>
  );
}
  
  export default Staffhome;