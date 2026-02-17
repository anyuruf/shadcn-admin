import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  ignore: ['app/components/ui/**', 'app/routeTree.gen.ts'],
  ignoreDependencies: ["tailwindcss", "tw-animate-css"]
};

export default config;