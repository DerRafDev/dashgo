import { Flex, useBreakpointValue } from '@chakra-ui/react';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile'
import { SearchBox } from './SearchBox';


//this will be the Header of our application
export function Header() {
    //this is for when is in Mobile, just show the Avatar
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true,
        //the name and email will just be visible when go to lg
    })

    return (
        <Flex 
            as="header" 
            w="100%"
            maxWidth={1480}
            h="20"
            mx="auto"
            mt="4"
            px="6"
            align="center"
        >
            <Logo />

            
            { isWideVersion && <SearchBox />
            // this will just show the SearchBox in Desktop, not in mobile 
            }

            <Flex align="center" ml="auto">
                <NotificationsNav />
            
                <Profile showProfileData={isWideVersion} />
            </Flex>
        </Flex>
    );
}