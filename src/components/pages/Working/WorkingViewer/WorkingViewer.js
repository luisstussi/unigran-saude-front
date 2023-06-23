import './WorkingViewer.scss';

export default function WorkingViewer({}){

    return(
        <span className='spanSchedulingViewerBackground'>
            <div>
                <h2>Teste Nome</h2>    
                <img width={'25px'} height={'25px'} src="https://img.icons8.com/fluency-systems-regular/96/null/menu-2--v1.png" alt='Icone de três pontos um em cima do outro, para sinalizar uma função de visualizar mais informações'/>
            </div>
            
            <p>email@email.com</p>

            <div className='divSchedulingInfo'>
                <img width={'20px'} height={'20px'} src="https://img.icons8.com/fluency-systems-regular/96/null/tear-off-calendar.png" alt='Icone de uma agenda para sinalizar a data do evento'/>
                12-03-2023
            </div>

            <div className='divSchedulingInfo'>
                <img width={'20px'} height={'20px'} src="https://img.icons8.com/fluency-systems-regular/96/null/bonds.png" alt='Icone de uma nota de dinheiro para sinalizar o status do pagamento'/>
                Status: pendente
            </div>
        </span>
    )
}