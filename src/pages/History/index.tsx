import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from 'date-fns' 
import { ptBR } from "date-fns/locale/pt-BR";

export function History(){
    const { cycles } = useContext(CyclesContext)
    return(
        <HistoryContainer>

            <h1>Meu Histórico</h1>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map(cycles => {
                            return(
                                <tr key={cycles.id}>
                                    <td>{cycles.task}</td>
                                    <td>{cycles.minutesAmount} minutos</td>
                                    <td>{formatDistanceToNow(new Date(cycles.startDate), {
                                        addSuffix: true,
                                        locale: ptBR,
                                    })}</td>
                                    <td>
                                        {/* condicional IF */}

                                        { cycles.finishedDate && (
                                            <Status statusColor="green">Concluido</Status>
                                        )}

                                        { cycles.interruptDate && (
                                            <Status statusColor="red">Interrompido</Status>
                                        )}

                                        { !cycles.finishedDate && !cycles.interruptDate &&(
                                            <Status statusColor="yellow">Em andamento</Status>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer> 
    )
}