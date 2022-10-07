import { Heading } from "@navikt/ds-react";

export const FrontPageLogo = () => (
  <div className="flex items-center gap-2">
    <div className="nada-slash h-9 w-[1.075rem] md:h-18 md:w-[2.125rem]" />
    <Heading level="1" size="xlarge" className="text-[3rem] md:text-[5.5rem] pb-2 font-extrabold">nav data</Heading>
    <div className="h-9 w-9 md:h-18 md:w-18 nada-logo" />
  </div>
)
