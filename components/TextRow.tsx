import Button from "@/components/Button";

/**
 * TextRow — a full-width statement set at the 8xl display step, with an
 * optional action pinned to the right of its first line.
 *
 * From the Figma component (2812:10099). The button is drawn but hidden on the
 * home page instance, so it is optional here rather than always rendered.
 */

export interface TextRowProps {
  children: React.ReactNode;
  action?: { label: string; href: string };
  as?: "h1" | "h2" | "p";
}

export default function TextRow({ children, action, as: Tag = "h2" }: TextRowProps) {
  return (
    <section className="text-row">
      <div className="container-width w-container">
        <div className="text-row__inner">
          <Tag className="headline size-8xl leading-display text-row__headline">{children}</Tag>
          {action ? (
            <div className="text-row__action">
              <Button href={action.href} arrow>
                {action.label}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
