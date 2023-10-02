const useLayout = () => {
    const layout = useState('layout', () => 'my-layout')

    const setLayout = (layoutName: string) => {
        return layout.value = layoutName
    }

    return {
        layout,
        setLayout
    }
}

export default useLayout