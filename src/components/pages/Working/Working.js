import Header from '../../RepeatedElements/Header';
import './Working.scss';
import WorkingViewer from './WorkingViewer/WorkingViewer';

export default function Working(){
    return(
        <section className='sectionWorkingBackground'>

        <Header title={'Funcionários'} btnTitle={'Criar Funcionário'} btnFunction={''}/>

        <div className='divGridWorking'>
            <WorkingViewer/>
        </div>
        
        </section>
    )
}