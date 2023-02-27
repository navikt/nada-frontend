import { BodyShort, Heading } from "@navikt/ds-react";

export const FrontPageLogo = () => (
  <div className="flex flex-col items-center">
    <div className="flex items-center md:gap-2 gap-1">
      <div className="nada-slash h-7 w-4 md:h-12 md:w-[1.5rem]" />
      <Heading level="1" size="xlarge" className="text-[2rem] md:text-[4rem] pb-1 md:pb-2 font-bold">datamarkedsplassen</Heading>
      <div className="h-7 w-7 md:h-12 md:w-12 nada-logo" />
    </div>
    <BodyShort className="font-bold text-xl md:text-2xl">dele, finne og bruke data</BodyShort>
  </div>
)

export const HeaderLogo = () => (
  <div className="flex items-center gap-1">
    <div className="nada-slash--white h-7 w-3 hidden md:block" />
    <Heading level="1" size="xsmall" className="text-[1.5rem] font-bold hidden md:block">datamarkedsplassen</Heading>
    <div className="h-7 w-7 nada-logo" />
  </div>

)