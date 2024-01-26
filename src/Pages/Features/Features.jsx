
import { FeatureCard } from "./FetcherCurd/FetcherCard";
import FetcherHoverItem from "./FetcherHoverItem/FetcherHoverItem";


const Features = () => {
    return (
        <section className="bg-white dark:bg-gray-900 ">
       <FetcherHoverItem ></FetcherHoverItem>

        <div>
        <div className="max-w-xl mb-10 sm:mx-auto">
        <h2 className="font-sans text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl sm:text-center">
        What matters to you, matters to us{' '}
          <span className="inline-block text-deep-purple-accent-400">
            a lazy dog
          </span>
        </h2>
        <p className="text-base text-gray-700 md:text-lg text-center">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque rem aperiam, eaque ipsa quae.
        </p>
      </div>
     
        </div>
        <FeatureCard></FeatureCard>
        
      </section>
    );
};

export default Features;