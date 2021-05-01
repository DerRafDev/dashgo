import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

//this is the profile part of the Header
// In the Avatar it can be the image or the name like "DF"
export function Profile() {
    return (
        <Flex
            align="center"
        >
            <Box mr="4" textAlign="right">
                <Text>DerRafDev</Text>
                <Text color="gray.300" fontSize="small">
                    derRafDev@example.com
                        </Text>
            </Box>

            <Avatar size="md" name="Der Raf" src="https://github.com/DerRafDev.png" />
        </Flex>
    );
}