import { Stack, Box, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalCountOfRegisters: number;
    registersPerPage?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

//this is for when a page is like 1 ... 4 5 6 ... 20, sibilings are 4 5 6
const sibilingsCount = 1;

function generatePagesArray (from: number, to: number) {
    //for example 2 to 5, will create 3 array, 2 4 5
    return [...new Array(to - from)]
        .map((_, index) => {
            return from + index + 1;
        })
        .filter(page => page > 0)
}

//this is the button to go to the next page
export function Pagination({
    totalCountOfRegisters,
    registersPerPage = 10,
    currentPage = 1,
    onPageChange
}: PaginationProps) {
    const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - sibilingsCount, currentPage - 1)
        : []

    const nextPages = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + sibilingsCount, lastPage))
        : []

    return (
        <Stack
            direction={["column", "row"]}
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> of <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">

                {currentPage > (1 + sibilingsCount) && (
                    <>
                    <PaginationItem number={1} />
                    { currentPage > (2 + sibilingsCount) && (
                        <Text color="gray.300" w="8" textAlign="center">...</Text>
                    )}
                    </>
                )}

                {previousPages.length > 0 && previousPages.map(page=> {
                    return  <PaginationItem key={page} number={page} />
                })}

                <PaginationItem number={currentPage} isCurrent />

                {nextPages.length > 0 && nextPages.map(page=> {
                    return  <PaginationItem key={page} number={page} />
                })}

                {(currentPage + sibilingsCount) < lastPage && (
                    <>
                        { (currentPage + 1 + sibilingsCount) < lastPage && (
                            <Text color="gray.300" w="8" textAlign="center">...</Text>
                        )}
                        <PaginationItem number={lastPage} />
                    </>
                )}

            </Stack>
        </Stack>
    );
}