import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCoutdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from 'zod'
import { useState } from "react";

/**
 * function register(name: string){
 *  return {
 *     onChange: () => void,
 *     onBlur: () => void,
 *     onFocus: () => void,
 *  }
 * }
 */

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})


// Uma outra forma de referenciar a tipagem do meu formulário, é usando 
// as próprias tipagens que a biblioteca zod extrai em: "newCycleFormValidationSchema".
// Para isso eu uso o "type" extraindo uma outra referência e seus respectivos campos.

// Usando o typeof eu permito com que meu código TypeScript entenda
// uma variável JavaScript
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle{
    id: string
    task: string
    minutesAmount: number
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema), 
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    function handleCreateNewCycle(data: NewCycleFormData){
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
        }
        setCycles((state) => [...state, newCycle])
        setActiveCycleId(id)

        reset();
    }

    const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    const task = watch('task')
    const isSubmitDisabled = !task;

    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="">Vou trabalhar em</label>
                    <TaskInput 
                        id="task"
                        list="task-suggestions" 
                        placeholder="Dê um nome para o seu projeto"
                        {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                    </datalist>

                    <label htmlFor="">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', { valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCoutdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCoutdownButton>
            </form>
        </HomeContainer>
    )
}