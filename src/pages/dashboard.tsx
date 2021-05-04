import { Flex, SimpleGrid, Box, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

//this is just for when the user click in the chart
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
})

//this is for the style of the Chart
const options = {
    chart: {
        toolbar: {
            show: false,
        },
        zoom: {
            enable: false,
        },
        forecoler: theme.colors.gray[500],
    },
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        enabled: false,
    },
    xaxis: {
        type: 'datetime',
        axisBorder: {
            color: theme.colors.gray[600]
        },
        axisTicks: {
            color: theme.colors.gray[600]
        },
        categories: [
            //as we have 7 datas, we will put 7 dates
            '2021-03-18T00:00:00.000Z',
            '2021-03-19T00:00:00.000Z',
            '2021-03-20T00:00:00.000Z',
            '2021-03-21T00:00:00.000Z',
            '2021-03-22T00:00:00.000Z',
            '2021-03-23T00:00:00.000Z',
            '2021-03-24T00:00:00.000Z',
        ],
    },
    fill: {
        opacity: 0.3,
        type: 'gradient',
        gradient: {
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3
        }
    },
};

//this is the data of users subscribers in the week
const series = [
    { name: 'series1', data: [31, 120, 10, 28, 61, 18, 109]}
];

//this will be the dashboard page of our application
export default function Dashboard() {
    return (
        <Flex direction="column" h="100vh">
            <Header />

            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
                    <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pd="4"
                    >
                        <Text fontSize="lg" mb="4">Subscribers of the week</Text>
                        <Chart options={options} series={series} type="area" height={160} />
                    </Box>
                    <Box
                        p={["6", "8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pd="4"
                    >
                        <Text fontSize="lg" mb="4">Opening rate</Text>
                        <Chart options={options} series={series} type="area" height={160} />

                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}